export const imgUpload = (Taro, images, uploadImgUrl)=>{
    const promisesArr = [];
    if (!images.length > 0) {
      return Promise.resolve(promisesArr);
    }
    Taro.showLoading({
      title: '加载中...',
    });
    const webImg = images.filter(val => val.webImg).map(val => val.url.split('/assets/')[1]);
    const localImg = images.filter(val => !val.webImg);
    localImg.forEach(val => {
      const file = {
        url: uploadImgUrl,
        filePath: val.path || val.url,
        name: new Date().getTime() + ''
      };
      promisesArr.push(Taro.uploadFile(file));
    });
    return Promise.all(promisesArr).then(res => {
      Taro.hideLoading();
      console.log(res);
      const formImagesUploaded = [];
      res.forEach(val => {
        if (val.statusCode === 200) {
          const src = JSON.parse(val.data).filename.replace(/\\/g, '/');
          formImagesUploaded.push(src);
        } else {
          throw new Error();
        }
      });
      return webImg.concat(formImagesUploaded);
    })
    .catch(err=>{
      console.log(err);
      Taro.hideLoading();
      Taro.atMessage({
        'message': '图片上传失败,请重新保存',
        'type': 'error',
      });
    });

  };