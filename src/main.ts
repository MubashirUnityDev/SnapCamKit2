import { bootstrapCameraKit } from '@snap/camera-kit';

(async function () {
  try {
    // Initialize CameraKit
    const cameraKit = await bootstrapCameraKit({
      apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzE4MDQ2MzAzLCJzdWIiOiI2Y2M3N2RkZS00ODc3LTRjMWItYTAyOS05MDkwZGU1ODVhMjJ-U1RBR0lOR35kYWViNjUyZC1mYjVlLTRmNWMtYWUzYy1kY2RhOTQzNzRhZjUifQ.v75PsPghW0jKJ9_NblrmssInLkgqQPMVGFhRUulUa04'
    });

    // Get canvas element
    const canvas = document.getElementById('canvas');
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Canvas element not found');
    }

    // Create session
    const session = await cameraKit.createSession({
      liveRenderTarget: canvas
    });

    // Request camera access
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });

      // Directly pass the mediaStream to session.setSource()
      await session.setSource(mediaStream);
      await session.play();

      // Load and apply lens
      const lens = await cameraKit.lensRepository.loadLens(
        '43300180875',
        'c090668b-e4ab-4bae-b320-a56fed41220e'
      );

      await session.applyLens(lens);
    } catch (error) {
      console.error('Camera access error:', error);
    }
  } catch (error) {
    console.error('CameraKit initialization error:', error);
  }
})();
