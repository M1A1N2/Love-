// File storage
let uploadedFiles = [];

// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const uploadSection = document.getElementById('uploadSection');
const filesSection = document.getElementById('filesSection');
const filesGrid = document.getElementById('filesGrid');
const addMoreBtn = document.getElementById('addMoreBtn');
const shareLinkInput = document.getElementById('shareLinkInput');
const copyBtn = document.getElementById('copyBtn');
const copySuccess = document.getElementById('copySuccess');
const previewModal = document.getElementById('previewModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

// Initialize
init();

function init() {
    // Load files from localStorage
    loadFilesFromStorage();
    
    // Event listeners
    browseBtn.addEventListener('click', () => fileInput.click());
    addMoreBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop events
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);
    
    // Copy button
    copyBtn.addEventListener('click', copyShareLink);
    
    // Modal close
    modalClose.addEventListener('click', closeModal);
    previewModal.addEventListener('click', (e) => {
        if (e.target === previewModal) closeModal();
    });
    
    // Generate share link
    generateShareLink();
}

function handleDragOver(e) {
    e.preventDefault();
    dropZone.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
}

function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    processFiles(files);
    fileInput.value = ''; // Reset input
}

function processFiles(files) {
    files.forEach(file => {
        const fileData = {
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            file: file
        };
        
        // Read file as data URL for preview
        const reader = new FileReader();
        reader.onload = (e) => {
            fileData.dataUrl = e.target.result;
            uploadedFiles.push(fileData);
            saveFilesToStorage();
            renderFiles();
            showFilesSection();
        };
        
        // Read file based on type
        if (file.type.startsWith('image/')) {
            reader.readAsDataURL(file);
        } else if (file.type.startsWith('text/')) {
            reader.readAsText(file);
        } else {
            reader.readAsDataURL(file);
        }
    });
}

function renderFiles() {
    filesGrid.innerHTML = '';
    
    uploadedFiles.forEach(fileData => {
        const fileCard = createFileCard(fileData);
        filesGrid.appendChild(fileCard);
    });
}

function createFileCard(fileData) {
    const card = document.createElement('div');
    card.className = 'file-card';
    
    const preview = document.createElement('div');
    preview.className = 'file-preview';
    
    // Create preview based on file type
    if (fileData.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = fileData.dataUrl;
        img.alt = fileData.name;
        preview.appendChild(img);
    } else if (fileData.type.startsWith('video/')) {
        preview.innerHTML = '<div class="file-icon">🎥</div>';
    } else if (fileData.type.startsWith('audio/')) {
        preview.innerHTML = '<div class="file-icon">🎵</div>';
    } else if (fileData.type.includes('pdf')) {
        preview.innerHTML = '<div class="file-icon">📄</div>';
    } else if (fileData.type.includes('zip') || fileData.type.includes('rar')) {
        preview.innerHTML = '<div class="file-icon">📦</div>';
    } else if (fileData.type.startsWith('text/')) {
        preview.innerHTML = '<div class="file-icon">📝</div>';
    } else {
        preview.innerHTML = '<div class="file-icon">📎</div>';
    }
    
    const info = document.createElement('div');
    info.className = 'file-info';
    
    const name = document.createElement('div');
    name.className = 'file-name';
    name.textContent = fileData.name;
    name.title = fileData.name;
    
    const size = document.createElement('div');
    size.className = 'file-size';
    size.textContent = formatFileSize(fileData.size);
    
    const actions = document.createElement('div');
    actions.className = 'file-actions';
    
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'file-action-btn download-btn';
    downloadBtn.textContent = 'Download';
    downloadBtn.onclick = (e) => {
        e.stopPropagation();
        downloadFile(fileData);
    };
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'file-action-btn delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = (e) => {
        e.stopPropagation();
        deleteFile(fileData.id);
    };
    
    actions.appendChild(downloadBtn);
    actions.appendChild(deleteBtn);
    
    info.appendChild(name);
    info.appendChild(size);
    
    card.appendChild(preview);
    card.appendChild(info);
    card.appendChild(actions);
    
    // Click to preview
    card.addEventListener('click', () => previewFile(fileData));
    
    return card;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function downloadFile(fileData) {
    const link = document.createElement('a');
    link.href = fileData.dataUrl;
    link.download = fileData.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function deleteFile(fileId) {
    if (confirm('Are you sure you want to delete this file?')) {
        uploadedFiles = uploadedFiles.filter(f => f.id !== fileId);
        saveFilesToStorage();
        renderFiles();
        
        if (uploadedFiles.length === 0) {
            showUploadSection();
        }
    }
}

function previewFile(fileData) {
    modalBody.innerHTML = '';
    
    if (fileData.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = fileData.dataUrl;
        img.alt = fileData.name;
        modalBody.appendChild(img);
    } else if (fileData.type.startsWith('text/')) {
        const pre = document.createElement('pre');
        pre.textContent = fileData.dataUrl;
        modalBody.appendChild(pre);
    } else if (fileData.type.includes('pdf')) {
        const iframe = document.createElement('iframe');
        iframe.src = fileData.dataUrl;
        iframe.style.width = '100%';
        iframe.style.height = '600px';
        iframe.style.border = 'none';
        modalBody.appendChild(iframe);
    } else {
        const info = document.createElement('div');
        info.style.textAlign = 'center';
        info.style.padding = '40px';
        info.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 20px;">📎</div>
            <h3 style="margin-bottom: 10px;">${fileData.name}</h3>
            <p style="color: #6b7280; margin-bottom: 20px;">${formatFileSize(fileData.size)}</p>
            <button onclick="downloadFile(uploadedFiles.find(f => f.id === ${fileData.id}))" 
                    style="background: #6366f1; color: white; border: none; padding: 12px 24px; 
                           border-radius: 8px; font-size: 1rem; cursor: pointer; font-weight: 600;">
                Download File
            </button>
        `;
        modalBody.appendChild(info);
    }
    
    previewModal.classList.add('show');
}

function closeModal() {
    previewModal.classList.remove('show');
}

function showFilesSection() {
    uploadSection.style.display = 'none';
    filesSection.style.display = 'block';
}

function showUploadSection() {
    uploadSection.style.display = 'block';
    filesSection.style.display = 'none';
}

function generateShareLink() {
    // Generate a shareable link (in a real app, this would be a server-generated link)
    const baseUrl = window.location.origin + window.location.pathname;
    const shareId = btoa(Date.now().toString()).substring(0, 10);
    const shareLink = `${baseUrl}?share=${shareId}`;
    shareLinkInput.value = shareLink;
}

function copyShareLink() {
    shareLinkInput.select();
    shareLinkInput.setSelectionRange(0, 99999); // For mobile devices
    
    navigator.clipboard.writeText(shareLinkInput.value).then(() => {
        copySuccess.classList.add('show');
        copyBtn.textContent = '✓ Copied!';
        
        setTimeout(() => {
            copySuccess.classList.remove('show');
            copyBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                Copy
            `;
        }, 2000);
    }).catch(err => {
        alert('Failed to copy link. Please copy manually.');
    });
}

function saveFilesToStorage() {
    try {
        // Store file metadata (not the actual file data for large files)
        const fileMetadata = uploadedFiles.map(f => ({
            id: f.id,
            name: f.name,
            size: f.size,
            type: f.type,
            lastModified: f.lastModified,
            dataUrl: f.dataUrl
        }));
        localStorage.setItem('uploadedFiles', JSON.stringify(fileMetadata));
    } catch (e) {
        console.warn('Could not save to localStorage:', e);
    }
}

function loadFilesFromStorage() {
    try {
        const stored = localStorage.getItem('uploadedFiles');
        if (stored) {
            uploadedFiles = JSON.parse(stored);
            if (uploadedFiles.length > 0) {
                renderFiles();
                showFilesSection();
            }
        }
    } catch (e) {
        console.warn('Could not load from localStorage:', e);
    }
}

// Prevent default drag and drop on the whole page
document.addEventListener('dragover', (e) => {
    e.preventDefault();
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
});
