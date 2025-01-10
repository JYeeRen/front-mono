import chroma from 'chroma-js';

export type Color = chroma.Color;

export function generateDistinctColor(existingColors: Color[]) {
  let newColor = chroma.random();
  let isDistinct = false;
  const tolerance = 40; // 设置颜色差异的容忍度

  while (!isDistinct) {
      // 随机生成一个颜色
      newColor = chroma.random();
      console.log('newcolor', newColor);
      // 检查新颜色与现有颜色的差异
      isDistinct = existingColors.every((color) => {
          const distance = chroma.distance(newColor, color, 'hsl');
          console.log(color, distance);
          return distance > tolerance;
      });
      console.log('isDistinct', isDistinct);
  }

  return newColor;
}
