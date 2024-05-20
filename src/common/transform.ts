// 视频路径转图片
export function videoPathToImagePath(videoPath: string) {
  videoPath = videoPath.replace(".mp4", ".jpg");
  const hostSplit = videoPath.split("//");
  const fileNameSplit = hostSplit[1].split("/");
  fileNameSplit.splice(1, 0, "cover");
  return `${hostSplit[0]}//${fileNameSplit.join("/")}`;
}

/*
 * 截取视频的第一帧
 */
export function getVideoBase64(url: string) {
  return new Promise(function (resolve) {
    let dataURL = "";
    let video = document.createElement("video");
    video.setAttribute("crossOrigin", "anonymous"); //处理跨域
    video.setAttribute("src", url);
    video.setAttribute("width", 400);
    video.setAttribute("height", 240);
    video.setAttribute("autoplay", "autoplay");
    video.addEventListener("canplaythrough", function () {
      let canvas = document.createElement("canvas"),
        width = video.width, //canvas的尺寸和图片一样
        height = video.height;
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(video, 0, 0, width, height); //绘制canvas
      dataURL = canvas.toDataURL("image/jpeg"); //转换为base64
      resolve(dataURL);
    });
  });
}
