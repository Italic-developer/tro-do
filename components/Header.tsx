import { ChartRadialStacked } from "./Chart"

export default function Header() {
    return (
        <div className="flex flex-row gap-5 bg-accent p-4 rounded-md m-3 items-center  ">
            <div className="flex flex-col gap-5 bg-inherit p-4 rounded-md m-3 ">
                <h2 className="font-semibold text-3xl">Welcome back, <span className="text-primary font-bold text-4xl">Patrick</span></h2>
                <p className="font-light text-2xl text-muted-foreground">You Have 3 undone tasks out of your original 10 </p>
            </div>
            <ChartRadialStacked />
        </div>
    );
}