import {createFileRoute} from '@tanstack/react-router'
import {NavigationComponent} from "@/components/NavigationComponent.tsx";
import {FooterComponent} from "@/components/FooterComponent.tsx";
import {SponsorComponent} from "@/pageCompoments/SponsorComponent.tsx";

export const Route = createFileRoute('/sponsor')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <NavigationComponent/>
            <SponsorComponent/>
            <FooterComponent/>
        </>
    )
}
