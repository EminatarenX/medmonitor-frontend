interface Props {
    value?: string | null;
    color: string;
}

export const ArticleTitle = ({ value, color }: Props) => {
    return <h1 className={`tracking-wider text-xl text-${color} font-bold capitalize`}>{value}</h1>;
};