import { getCompleteUserData } from "@/api/server";
import Navbar from "./navbar";

export default async function Nav() {
    try {
        const { authUser, userData,  isFallback } = await getCompleteUserData();

        if (!authUser || !userData) {
            // console.log("No authenticated user found");
            return <Navbar user={null} />;
        }
        if (isFallback) {
        }

        return <Navbar user={userData} />;
        
    } catch (error) {
        console.error("Error in Nav component:", error);
        return <Navbar user={null} />;
    }
}