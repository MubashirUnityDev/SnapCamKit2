import { bootstrapCameraKit } from '@snap/camera-kit';

(async function () {
  const cameraKit = await bootstrapCameraKit({
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzE4MDQ2MzAzLCJzdWIiOiI2Y2M3N2RkZS00ODc3LTRjMWItYTAyOS05MDkwZGU1ODVhMjJ-U1RBR0lOR35kYWViNjUyZC1mYjVlLTRmNWMtYWUzYy1kY2RhOTQzNzRhZjUifQ.v75PsPghW0jKJ9_NblrmssInLkgqQPMVGFhRUulUa04',
  });
  
  const liveRenderTarget = document.getElementById('canvas') as HTMLCanvasElement;
  const captureBtn = document.getElementById('captureBtn') as HTMLButtonElement;
  const recordBtn = document.getElementById('recordBtn') as HTMLButtonElement;
  
  const session = await cameraKit.createSession({ liveRenderTarget });
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true, // Enable audio for recording
  });

  await session.setSource(mediaStream);
  await session.play();

  const lens = await cameraKit.lensRepository.loadLens(
    '43300180875',
    'c090668b-e4ab-4bae-b320-a56fed41220e'
  );

  await session.applyLens(lens);

  // Image capture functionality
  // Replace the existing image capture functionality with this:

// Image capture functionality
captureBtn.addEventListener('click', async () => {
  try {
    // Get the canvas element
    const canvas = liveRenderTarget;
    
    // Create a temporary link element
    const downloadLink = document.createElement('a');
    
    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL('image/png');
    
    // Set up download attributes
    downloadLink.href = dataUrl;
    downloadLink.download = `snapshot-${Date.now()}.png`;
    
    // Trigger download
    downloadLink.click();
  } catch (error) {
    console.error('Error capturing image:', error);
  }
});

  // Video recording functionality
  let mediaRecorder: MediaRecorder | null = null;
  let recordedChunks: Blob[] = [];
  let isRecording = false;

  recordBtn.addEventListener('click', () => {
    if (!isRecording) {
      // Start recording
      recordedChunks = [];
      const stream = liveRenderTarget.captureStream(30); // 30 FPS
      mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `recording-${Date.now()}.webm`;
        downloadLink.click();
        URL.revokeObjectURL(url);
      };

      mediaRecorder.start();
      isRecording = true;
      recordBtn.textContent = '⏹️ Stop';
      recordBtn.style.backgroundColor = '#ff4444';
    } else {
      // Stop recording
      mediaRecorder?.stop();
      isRecording = false;
      recordBtn.textContent = '🎥 Record';
      recordBtn.style.backgroundColor = '';
    }
  });
})();