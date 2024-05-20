import { View } from "@tarojs/components";
import React, { useEffect, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { GetPosterDetails } from "@/apis/product";
import NavTool from "@/components/base/nav";
import PosterPage from '@/components/PosterGenerator';

import "./index.less";

export default function ProductSelectProduct() {
  const router = useRouter<{ posterId: string }>();
  const [gPosterDetails, setPosterDetails] = useState<string | undefined>();
  const [title, settitle] = useState<string>();
  const [width, setwidth] = useState<number>();
  const [height, setheight] = useState<number>();
  
  useEffect(() => {
    PosterDetails();
  }, []);
  const PosterDetails = async () => {
    const res = await GetPosterDetails({
      id: router.params.posterId,
    });
    console.log(JSON.parse(res.data))
    settitle(res.title)
    setwidth(res.width)
    setheight(res.height)
    setPosterDetails(res.data);
  };


  return (
    <View className="product-select-product-container" style='background-color: #1C1C1C;height:100vh'>
      <NavTool color="#fff" title={title} isShowToTop isShowBgColor="#1C1C1C"/>
      <PosterPage content={gPosterDetails} width={width} height={height}/>
    </View>
  );
}
