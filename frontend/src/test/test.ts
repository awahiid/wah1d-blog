type Image = {
  id: number;
  width: number;
  height: number;
  url: string;
};

function doSomething(image: Image): void {
  image.url = "B";
}

const newImage: Image = {
  id: 0,
  width: 200,
  height: 200,
  url: "A",
};

doSomething(newImage);

console.log(newImage);
