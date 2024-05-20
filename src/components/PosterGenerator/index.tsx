import React, { useState, useRef,useCallback,useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Input, Button } from '@tarojs/components';

import './index.less';
interface CanvasProps {
  content: string,
  height:number,
  width:number,
};


const PosterGenerator: React.FC<CanvasProps> = ({content,height,width}) => {
  // console.log(JSON.parse(content))
  if (!content) return;
  const PosterData = JSON.parse(content)
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [posterImage, setPosterImage] = useState('');

  const [context, setContext] = useState<any>(null);
  const [textX, setTextX] = useState<number>(50);
  const [textY, setTextY] = useState<number>(50);
  const [imageX, setImageX] = useState<number>(100);
  const [imageY, setImageY] = useState<number>(100);
  const [touch, setTouch] = useState<any>({});

  const canvasRef = useRef<Taro.CanvasContext | null>(null);

  useEffect(() => {
    GeneratePoster();
  }, []);

  const GeneratePoster = ()=>{
    if (!canvasRef.current) return;
    Taro.showLoading({
      title: '加载中...',
      mask: true , 
    });
    
    const query = Taro.createSelectorQuery();
    query.select('.poster').boundingClientRect();
    query.exec((res) => {
      const canvasWidth = window.innerWidth*0.872 || 0;
      const canvasHeight = window.innerHeight* (1163/1530)|| 0;
   
      console.log(canvasHeight)
      const Wb = canvasWidth/width
      const Hb = canvasHeight/height
      const fontb = 0.872 //canvasWidth/canvasHeight
      const ctx = Taro.createCanvasContext('posterCanvas', this);
      // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      setContext(ctx)
      // 绘制背景
      ctx.setFillStyle('#ffffff');
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      const loadImage = async () => {
        for (const element of PosterData.widgets){
          if (element.type === "w-image") {
            const res = await Taro.getImageInfo({ src: element.imgUrl });
            ctx.drawImage(res.path, element.left*Wb, element.top*Hb,element.width*Wb, element.height*Hb);
          }else if (element.type === 'w-text') {
            ctx.fillStyle = element.color || '#000000';
            // ctx.fillStyle = '#ffffff';
            console.log(element.fontSize*fontb)
            ctx.font = `${element.fontSize*fontb }rpx ${element.fontFamily}`;
            ctx.fillText(element.text, element.left*Wb, element.top*Hb+10);
          } 
        }
        await ctx.draw(false, () => {
          Taro.canvasToTempFilePath({
            canvasId: 'posterCanvas',
            success: (res) => {
              setPosterImage(res.tempFilePath);
              Taro.hideLoading();
            },
            fail: () => {
              Taro.hideLoading();
              Taro.showToast({
                title: 'Failed to generate',
                icon: 'none',
                duration: 2000,
              });
            },
          });
        });
      };
    loadImage()
    });
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleImageChange = async () => {
    const res = await Taro.chooseImage({
      count: 1, // 选择图片的数量，这里设置为1
      sourceType: ['album', 'camera'], // 图片选择的来源，可以是相册或相机
    });

    const tempFilePath = res.tempFilePaths[0];
    setImage(tempFilePath)
  };
 
  const handleSavePoster = () => {
    if (!posterImage) return;
    Taro.saveImageToPhotosAlbum({
      filePath: posterImage,
      success: () => {
        Taro.showToast({
          title: 'Saved to album',
          icon: 'success',
          duration: 2000,
        });
      },
      fail: () => {
        Taro.showToast({
          title: 'Failed to save',
          icon: 'none',
          duration: 2000,
        });
      },
    });
  };



 

  const handleTouchStart = useCallback((e:any) => {
    const touch = e.touches[0];
    const { clientX, clientY } = touch;

    if (
      clientX >= textX && clientX <= textX + 100 && clientY >= textY && clientY <= textY + 20 ||
      clientX >= imageX && clientX <= imageX + 100 && clientY >= imageY && clientY <= imageY + 100
    ) {
      setTouch({
        startX: clientX,
        startY: clientY,
        element: clientX >= textX && clientX <= textX + 100 && clientY >= textY && clientY <= textY + 20 ? 'text' : 'image'
      });
    }
  }, [textX, textY, imageX, imageY]);

  const handleTouchMove = useCallback((e) => {
    const touchMove = e.touches[0];
    const { startX, startY, element } = touch;
    const { clientX, clientY } = touchMove;

    if (element === 'text') {
      const offsetX = clientX - startX;
      const offsetY = clientY - startY;
      setTextX((prevX) => prevX + offsetX);
      setTextY((prevY) => prevY + offsetY);
    } else if (element === 'image') {
      const offsetX = clientX - startX;
      const offsetY = clientY - startY;
      setImageX((prevX) => prevX + offsetX);
      setImageY((prevY) => prevY + offsetY);
    }

  }, [touch]);

  const handleTouchEnd = useCallback(() => {
    setTouch({});
  }, []);

  return (
    <View className="poster-generator">
      <View className="controls">
        <Button className="save-btn" onClick={handleSavePoster}>保存</Button>
      </View>
     
      <canvas className="hidden-canvas" id="posterCanvas" canvas-id="posterCanvas"
       onTouchStart={handleTouchStart}
       onTouchMove={handleTouchMove}
       onTouchEnd={handleTouchEnd}
       ref={canvasRef}></canvas>
    </View>
  );
};

export default PosterGenerator;