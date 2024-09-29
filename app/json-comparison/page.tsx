import {JsonComparison} from "@/components/json-comparison";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Json Comparison",
    description: "A tool that can compare two JSON strings to find the differences.",
};

export default function Page(){
    return (
        <div>
            <JsonComparison/>
        </div>
    )
}