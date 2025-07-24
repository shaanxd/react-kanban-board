export const generateBoardId = (name: string) =>
  name.toLowerCase().split(" ").join("-");
