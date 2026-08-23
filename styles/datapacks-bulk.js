// Bulk-download for the datapacks page. Each pack's .zip already has its own
// top-level folder (e.g. campfire_aura/pack.mcmeta) — exactly the layout
// Minecraft expects when several packs sit side by side in a `datapacks`
// folder — so "merging" selected packs is just copying each one's files,
// unchanged, into one combined zip. No cross-pack name collisions to resolve.
(function () {
  const checkboxes = Array.from(document.querySelectorAll('.pack-select'));
  const selectAll = document.getElementById('selectAll');
  const bulkCount = document.getElementById('bulkCount');
  const bulkBtn = document.getElementById('bulkDownloadBtn');
  if (!checkboxes.length || !bulkBtn) return;

  function selected() {
    return checkboxes.filter((cb) => cb.checked);
  }

  function refresh() {
    const n = selected().length;
    bulkCount.textContent = n === 1 ? '1 selected' : n + ' selected';
    bulkBtn.disabled = n === 0;
    selectAll.checked = n === checkboxes.length;
    selectAll.indeterminate = n > 0 && n < checkboxes.length;
  }

  checkboxes.forEach((cb) => cb.addEventListener('change', refresh));

  selectAll.addEventListener('change', () => {
    checkboxes.forEach((cb) => { cb.checked = selectAll.checked; });
    refresh();
  });

  bulkBtn.addEventListener('click', async () => {
    const packs = selected();
    if (!packs.length) return;

    const originalLabel = bulkBtn.textContent;
    bulkBtn.disabled = true;
    bulkBtn.textContent = 'Building zip…';

    try {
      const merged = new JSZip();

      for (const cb of packs) {
        const res = await fetch(cb.dataset.file);
        if (!res.ok) throw new Error('Failed to fetch ' + cb.dataset.file);
        const buf = await res.arrayBuffer();
        const packZip = await JSZip.loadAsync(buf);

        const entries = [];
        packZip.forEach((relPath, entry) => entries.push(entry));
        for (const entry of entries) {
          if (entry.dir) continue;
          const content = await entry.async('uint8array');
          merged.file(entry.name, content);
        }
      }

      const blob = await merged.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const stamp = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = 'johngoco-datapacks-' + packs.length + '-packs-' + stamp + '.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('Something went wrong building the zip. Try downloading the packs individually instead.');
    } finally {
      bulkBtn.textContent = originalLabel;
      refresh();
    }
  });

  refresh();
})();
