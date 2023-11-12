export const splitByNewLine = (p: string) => {
  return p.split("\n").map((oneline) => <span>{oneline}</span>);
};

export const delay = (fn: any, ms?: number) => {
  setTimeout(() => {
    fn();
  }, ms);
};
