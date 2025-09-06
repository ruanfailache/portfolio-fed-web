import { Metadata } from "next";
import HomeScreen from "@/ui/screens/HomeScreen";

export const metadata: Metadata = {
    title: "Ruan Failache - Home",
};

export default function Home() {
    return <HomeScreen />;
}