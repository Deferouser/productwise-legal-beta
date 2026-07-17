document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Elements
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn.querySelector('i');
  
  // Document Viewer Elements
  const docContentBox = document.getElementById('docContentBox');
  const readingProgressBarFill = document.getElementById('readingProgressBarFill');
  const readIndicator = document.getElementById('readIndicator');
  
  // Initialize
  initTheme();
  
  // --- 1. Theme Management ---
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      themeIcon.className = 'bi bi-moon-stars';
    } else {
      document.body.classList.remove('light-theme');
      themeIcon.className = 'bi bi-sun';
    }
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeIcon.className = isLight ? 'bi bi-moon-stars' : 'bi bi-sun';
  });

  // --- 2. Scroll and Read Tracking ---
  docContentBox.addEventListener('scroll', () => {
    const scrollTop = docContentBox.scrollTop;
    const scrollHeight = docContentBox.scrollHeight;
    const clientHeight = docContentBox.clientHeight;
    
    const totalScrollable = scrollHeight - clientHeight;
    const scrollPercentage = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;
    
    readingProgressBarFill.style.width = `${scrollPercentage}%`;
    
    // Update read indicator status
    if (scrollPercentage >= 90) {
      readIndicator.innerHTML = '<span class="badge bg-success"><i class="bi bi-check-circle-fill me-1"></i> Read Completed</span>';
    } else {
      readIndicator.innerHTML = '<i class="bi bi-book me-1"></i> Scroll to read';
    }
  });
});
