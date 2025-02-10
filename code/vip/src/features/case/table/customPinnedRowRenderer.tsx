import { Thin_CustomCellRendererProps } from "./table.types";

interface CellStyle {
    [cssProperty: string]: string | number;
}
export default function CustomPinnedRowRenderer(props: Thin_CustomCellRendererProps & { style: CellStyle }) {
    return <span style={props.style}>{props.value}</span>;
}