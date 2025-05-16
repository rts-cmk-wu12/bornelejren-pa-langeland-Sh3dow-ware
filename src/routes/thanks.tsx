import {createFileRoute} from '@tanstack/react-router'
import {NavigationComponent} from "@/components/NavigationComponent.tsx";
import {FooterComponent} from "@/components/FooterComponent.tsx";
import {ThanksComponent} from "@/pageCompoments/ThanksComponent.tsx";

export const Route = createFileRoute('/thanks')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <NavigationComponent/>
             <ThanksComponent/>
            <FooterComponent/>
        </>
    )
}
