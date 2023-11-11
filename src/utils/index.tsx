export const splitByNewLine = (p: string) => {
	return p.split("\n").map((oneline) => <span>{oneline}</span>);
};
