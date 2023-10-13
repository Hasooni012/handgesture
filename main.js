const URL = "https://teachablemachine.withgoogle.com/models/V8nX8a2o-/"; // Replace with your Teachable Machine model URL

async function init() {
  const model = await tmPose.load(URL + "model.json", URL + "metadata.json");
  const video = document.getElementById("video");
  const output = document.getElementById("output");

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (err0r) {
        console.log("Something went wrong!");
      });
  }

  setInterval(async () => {
    const { pose, posenetOutput } = await model.estimatePose(video);
    const prediction = await model.predict(posenetOutput);

    let highestProbability = 0;
    let gesture = '';

    prediction.forEach((item) => {
      if (item.probability > highestProbability) {
        highestProbability = item.probability;
        gesture = item.className;
      }
    });

    output.innerHTML = `Detected Gesture: ${gesture}`;
    // You can add a function to speak the meaning of the gesture here
  }, 2000);
}

init();
