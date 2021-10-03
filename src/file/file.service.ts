import { apiHttpClient } from '../app/app.service';

/**
 * 获取图片数据
 */
export const getImageBase64 = async (imageUrl: string) => {
  const response = await apiHttpClient.get(imageUrl, { responseType: 'blob' });

  return new Promise(resolve => {
    const reader = new FileReader();

    reader.readAsDataURL(response.data);

    reader.onload = () => {
      resolve(reader.result);
    };
  });
};
