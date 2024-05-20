import { WebView } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";

function WebViewPage() {
  const router = useRouter<{ webViewUrl: string; taskId: string }>();

  return (
    <WebView
      src={router.params.webViewUrl + `?taskId=${router.params.taskId}`}
      // src={
      //   "http://192.168.2.20:10086/#/pages/index/index" +
      //   `?taskId=${router.params.taskId}`
      // }
    ></WebView>
  );
}
export default WebViewPage;
