class WeatherUtilService {
  getIconUrl(id: string, url: string): string {
    return `${url}${id}@2x.png`
  }
  convertVisibility(visibility: number): string {
    return (visibility / 1000).toFixed(1) + 'km'
  }
  rotateDeg(deg: number) {
    return `rotate(${deg}deg)`
  }
}

export default WeatherUtilService