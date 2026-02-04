import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import Center from "./Sections/Center";

export default function Home(){
    return(
        <main className="w-full h-full flex flex-col">
            <Header />
            <Center />
            <Center />
            <Footer />
        </main>
    )
}