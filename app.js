document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Elements
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn.querySelector('i');
  
  // Document Viewer Elements
  const docContentBox = document.getElementById('docContentBox');
  const readingProgressBarFill = document.getElementById('readingProgressBarFill');
  const readIndicator = document.getElementById('readIndicator');
  
  // Form & Signature Elements
  const agreementForm = document.getElementById('agreementForm');
  const testerNameInput = document.getElementById('testerNameInput');
  const testerEmailInput = document.getElementById('testerEmailInput');
  const agreeCheck = document.getElementById('agreeCheck');
  const submitBtn = document.getElementById('submitBtn');
  const clearSigBtn = document.getElementById('clearSigBtn');
  const signatureCanvas = document.getElementById('signatureCanvas');
  const sigTabs = document.querySelectorAll('[name="sig-type"]');
  const drawSigWrapper = document.getElementById('drawSigWrapper');
  const typeSigWrapper = document.getElementById('typeSigWrapper');
  const typedSigInput = document.getElementById('typedSigInput');
  const typedSigFont = document.getElementById('typedSigFont');
  
  // Certificate Preview Elements
  const certTesterName = document.getElementById('certTesterName');
  const certTesterEmail = document.getElementById('certTesterEmail');
  const certDate = document.getElementById('certDate');
  const certStatus = document.getElementById('certStatus');
  const certSigPreview = document.getElementById('certSigPreview');
  const certHash = document.getElementById('certHash');
  
  // Rewards Simulator Elements
  const priceReportsSlider = document.getElementById('priceReportsSlider');
  const sliderVal = document.getElementById('sliderVal');
  const testerStatusBadge = document.getElementById('testerStatusBadge');
  const totalPointsEarned = document.getElementById('totalPointsEarned');
  const rewardsDisplayCard = document.getElementById('rewardsDisplayCard');
  const rewardMessage = document.getElementById('rewardMessage');

  // Modal success
  const successModal = new bootstrap.Modal(document.getElementById('successModal'));
  const finalCertContainer = document.getElementById('finalCertContainer');
  const downloadCertBtn = document.getElementById('downloadCertBtn');

  // State Variables
  let isDrawing = false;
  let hasDrawSignature = false;
  let selectedSigType = 'draw'; // 'draw' or 'type'
  let hasReadDocument = false;

  // Initialize
  initTheme();
  initSignatureCanvas();
  updateCertificateDate();
  generateCertHash();
  
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
    
    // Redraw signature on theme change to prevent invisibility if drawn in invert mode
    if (selectedSigType === 'draw' && hasDrawSignature) {
      updateCertSignature();
    }
  });

  // --- 2. Scroll and Read Tracking ---
  docContentBox.addEventListener('scroll', () => {
    const scrollTop = docContentBox.scrollTop;
    const scrollHeight = docContentBox.scrollHeight;
    const clientHeight = docContentBox.clientHeight;
    
    const totalScrollable = scrollHeight - clientHeight;
    const scrollPercentage = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;
    
    readingProgressBarFill.style.width = `${scrollPercentage}%`;
    
    // Mark as read once scrolled past 90%
    if (scrollPercentage >= 90 && !hasReadDocument) {
      hasReadDocument = true;
      readIndicator.innerHTML = '<span class="badge bg-success"><i class="bi bi-patch-check-fill me-1"></i> Document Read</span>';
      agreeCheck.removeAttribute('disabled');
      validateForm();
    }
  });

  // --- 3. Digital Signature Canvas ---
  const ctx = signatureCanvas.getContext('2d');
  
  function initSignatureCanvas() {
    // Set scale based on client width
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Styling the line
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#6366f1'; // Defaults to Indigo
    
    // Draw event listeners
    signatureCanvas.addEventListener('mousedown', startDrawing);
    signatureCanvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDrawing);
    
    // Touch event support for mobiles/tablets
    signatureCanvas.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      signatureCanvas.dispatchEvent(mouseEvent);
      e.preventDefault();
    }, { passive: false });

    signatureCanvas.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      signatureCanvas.dispatchEvent(mouseEvent);
      e.preventDefault();
    }, { passive: false });

    window.addEventListener('touchend', () => {
      const mouseEvent = new MouseEvent('mouseup', {});
      window.dispatchEvent(mouseEvent);
    });
  }

  function resizeCanvas() {
    // Don't lose existing drawing on resize if possible, or just re-draw
    const tempImage = signatureCanvas.toDataURL();
    const rect = signatureCanvas.getBoundingClientRect();
    signatureCanvas.width = rect.width;
    signatureCanvas.height = rect.height;
    
    // Restore styling properties lost on size change
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    updateCanvasStrokeColor();
    
    if (hasDrawSignature) {
      const img = new Image();
      img.onload = function() {
        ctx.drawImage(img, 0, 0, signatureCanvas.width, signatureCanvas.height);
      };
      img.src = tempImage;
    }
  }

  function updateCanvasStrokeColor() {
    const isLight = document.body.classList.contains('light-theme');
    ctx.strokeStyle = isLight ? '#4f46e5' : '#818cf8'; // dark blue vs indigo light
  }

  function startDrawing(e) {
    isDrawing = true;
    const pos = getMousePos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(e) {
    if (!isDrawing) return;
    const pos = getMousePos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    hasDrawSignature = true;
    updateCertSignature();
    validateForm();
  }

  function stopDrawing() {
    if (isDrawing) {
      isDrawing = false;
      ctx.closePath();
    }
  }

  function getMousePos(e) {
    const rect = signatureCanvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  clearSigBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
    hasDrawSignature = false;
    updateCertSignature();
    validateForm();
  });

  // Toggle Signature Types (Draw vs Type)
  sigTabs.forEach(tab => {
    tab.addEventListener('change', (e) => {
      selectedSigType = e.target.value;
      if (selectedSigType === 'draw') {
        drawSigWrapper.classList.remove('d-none');
        typeSigWrapper.classList.add('d-none');
      } else {
        drawSigWrapper.classList.add('d-none');
        typeSigWrapper.classList.remove('d-none');
      }
      updateCertSignature();
      validateForm();
    });
  });

  // Live update signature preview on keypress
  typedSigInput.addEventListener('input', () => {
    updateCertSignature();
    validateForm();
  });

  typedSigFont.addEventListener('change', () => {
    updateCertSignature();
  });

  // --- 4. Live Certificate Updates ---
  testerNameInput.addEventListener('input', (e) => {
    const name = e.target.value.trim();
    certTesterName.textContent = name || '[ Tester Name ]';
    validateForm();
  });

  testerEmailInput.addEventListener('input', (e) => {
    const email = e.target.value.trim();
    certTesterEmail.textContent = email || '[ tester@email.com ]';
    validateForm();
  });

  agreeCheck.addEventListener('change', () => {
    validateForm();
  });

  function updateCertificateDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
    const today = new Date();
    certDate.textContent = today.toLocaleDateString('en-US', options);
  }

  function generateCertHash() {
    // Generate a simulated secure agreement hash
    const chars = '0123456789ABCDEF';
    let hash = 'DEFERO-PW-';
    for (let i = 0; i < 24; i++) {
      hash += chars[Math.floor(Math.random() * 16)];
    }
    certHash.textContent = hash;
  }

  function updateCertSignature() {
    if (selectedSigType === 'draw') {
      if (hasDrawSignature) {
        certSigPreview.innerHTML = `<img src="${signatureCanvas.toDataURL()}" class="cert-signature-img" alt="Digital Signature">`;
      } else {
        certSigPreview.innerHTML = '<span class="text-danger small"><i class="bi bi-x-circle"></i> Signature Missing</span>';
      }
    } else {
      const name = typedSigInput.value.trim();
      const font = typedSigFont.value;
      if (name) {
        certSigPreview.innerHTML = `<span style="font-family: '${font}', cursive; font-size: 1.85rem; color: var(--primary); font-weight: 500;">${name}</span>`;
      } else {
        certSigPreview.innerHTML = '<span class="text-danger small"><i class="bi bi-x-circle"></i> Signature Missing</span>';
      }
    }
  }

  // --- 5. Form Validation ---
  function validateForm() {
    const nameValid = testerNameInput.value.trim().length > 0;
    const emailValid = validateEmail(testerEmailInput.value.trim());
    const agreed = agreeCheck.checked;
    
    let signatureValid = false;
    if (selectedSigType === 'draw') {
      signatureValid = hasDrawSignature;
    } else {
      signatureValid = typedSigInput.value.trim().length > 0;
    }
    
    const isValid = nameValid && emailValid && agreed && signatureValid && hasReadDocument;
    submitBtn.disabled = !isValid;
    
    if (isValid) {
      submitBtn.classList.add('glow-focus');
    } else {
      submitBtn.classList.remove('glow-focus');
    }
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // --- 6. Contributor Goal Simulator ---
  priceReportsSlider.addEventListener('input', (e) => {
    const reports = parseInt(e.target.value, 10);
    sliderVal.textContent = reports;
    
    // Milestones status logic
    const milestoneDot = document.getElementById('milestoneDot');
    
    if (reports >= 10) {
      // Contributor status reached!
      milestoneDot.classList.add('active');
      testerStatusBadge.className = 'badge-custom-alert';
      testerStatusBadge.innerHTML = '<i class="bi bi-trophy-fill me-1"></i> Contributor Status Unlocked';
      certStatus.innerHTML = '<span class="text-success"><i class="bi bi-patch-check-fill"></i> Contributor (Verified)</span>';
      
      // Calculate reward points
      const extraReports = reports - 10;
      const points = 500 + (extraReports * 75); // base points for attaining contributor + additional points per report
      totalPointsEarned.textContent = points;
      
      rewardsDisplayCard.classList.add('unlocked');
      rewardMessage.innerHTML = `
        <span class="text-success fw-semibold"><i class="bi bi-check-circle-fill me-1"></i> Contributor Tier Reached!</span><br>
        You've surpassed the 10 verified reports requirement. <strong>${points} GiftMe points</strong> accumulated. You are now eligible to cash out for GiftMe gift cards!
      `;
    } else {
      // Standard beta tester status
      milestoneDot.classList.remove('active');
      testerStatusBadge.className = 'badge bg-secondary';
      testerStatusBadge.innerHTML = '<i class="bi bi-shield-lock-fill me-1"></i> Active Beta Tester';
      certStatus.innerHTML = '<span><i class="bi bi-shield-check"></i> Registered Beta Tester</span>';
      
      totalPointsEarned.textContent = '0';
      rewardsDisplayCard.classList.remove('unlocked');
      
      const reportsLeft = 10 - reports;
      rewardMessage.innerHTML = `
        <span class="text-muted"><i class="bi bi-info-circle me-1"></i> Progressing...</span><br>
        Submit <strong>${reportsLeft} more report${reportsLeft > 1 ? 's' : ''}</strong> to unlock your points wallet and begin redeeming rewards.
      `;
    }
  });

  // --- 7. Submission Flow ---
  agreementForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Finalize date and layout
    updateCertificateDate();
    
    // Clone certificate structure into final modal viewer
    const certClone = document.getElementById('certPreviewBox').cloneNode(true);
    // Remove duplicate IDs or styling issues
    certClone.id = 'finalCertDownloadable';
    
    finalCertContainer.innerHTML = '';
    finalCertContainer.appendChild(certClone);
    
    // Show success dialog
    successModal.show();
  });

  // Download certificate as print/PDF friendly page
  downloadCertBtn.addEventListener('click', () => {
    window.print();
  });
});
