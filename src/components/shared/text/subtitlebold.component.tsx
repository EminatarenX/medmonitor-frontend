interface Props {
    value: string;
    color: string;
}

export const SubTitleBold = ({ value, color }: Props) => {
    return <h1 className={`tracking-wider text-3xl text-${color} font-bold`}>{value}</h1>;
};