import Taro from '@tarojs/taro';

export default function appUpdate() {
  const updateManager = Taro.getUpdateManager();

  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    console.log('是否有更新:', res.hasUpdate);
  });

  updateManager.onUpdateReady(function () {
    Taro.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      }
    });
  });

  updateManager.onUpdateFailed(function () {
    // 新版本下载失败
    Taro.showToast({
      title: '新版本下载失败',
      icon: 'none',
      duration: 1000
    });
  });
}
