import {createFileRoute} from '@tanstack/react-router'
import {NavigationComponent} from "@/components/NavigationComponent.tsx";
import {HomeComponent} from "@/pageCompoments/HomeComponent.tsx";
import {FooterComponent} from "@/components/FooterComponent.tsx";
export const Route = createFileRoute('/')({
    component: App,
})

function App() {
    return (
        <>
            <NavigationComponent/>
            <HomeComponent/>
            <FooterComponent />
        </>
    )
}
