import {createFileRoute} from '@tanstack/react-router'
import {NavigationComponent} from "@/components/NavigationComponent.tsx";
import {FooterComponent} from "@/components/FooterComponent.tsx";
import {AboutUsComponent} from "@/pageCompoments/AboutUsComponent.tsx";

export const Route = createFileRoute('/about-us')({
    component: RouteComponent,
})

function RouteComponent() {
    return <>
        <NavigationComponent/>
        <AboutUsComponent/>
        <FooterComponent/>
    </>
}
