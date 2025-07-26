export const generateBoardId = (name: string) =>
  name.toLowerCase().split(" ").join("-");

export const generateEntityId = () => new Date().getTime();
