
import { bootstrapCameraKit } from '@snap/camera-kit';

(async function () {
  const cameraKit = await bootstrapCameraKit({
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzE4MDQ2MzAzLCJzdWIiOiI2Y2M3N2RkZS00ODc3LTRjMWItYTAyOS05MDkwZGU1ODVhMjJ-U1RBR0lOR35kYWViNjUyZC1mYjVlLTRmNWMtYWUzYy1kY2RhOTQzNzRhZjUifQ.v75PsPghW0jKJ9_NblrmssInLkgqQPMVGFhRUulUa04',
  });
  const liveRenderTarget = document.getElementById(
    'canvas'
  ) as HTMLCanvasElement;
  const session = await cameraKit.createSession({ liveRenderTarget });
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  await session.setSource(mediaStream);
  await session.play();

  const lens = await cameraKit.lensRepository.loadLens(
    '43300180875',
    'c090668b-e4ab-4bae-b320-a56fed41220e'
  );

  await session.applyLens(lens);
})();