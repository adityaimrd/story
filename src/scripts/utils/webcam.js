let stream = null;

export async function startWebcam(videoElementId) {
  try {
    const video = document.getElementById(videoElementId);
    
    if (stream) {
      stopWebcam();
    }

    stream = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: 'environment' },
      audio: false 
    });
    video.srcObject = stream;
    video.play();
  } catch (err) {
    console.error('Error accessing camera:', err);
    throw err;
  }
}

export function stopWebcam() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
}

export function capturePhoto(videoElementId, previewElementId) {
  return new Promise((resolve) => {
    const video = document.getElementById(videoElementId);
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const preview = document.getElementById(previewElementId);
    preview.src = canvas.toDataURL('image/jpeg');
    
    canvas.toBlob((blob) => {
      const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      resolve(dataTransfer.files);
    }, 'image/jpeg');
  });
}