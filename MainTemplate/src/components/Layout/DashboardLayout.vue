<template>
    <v-app>
    <div>
        <side-bar>
        </side-bar>
        <div class="main">
            <top-navbar></top-navbar>
            <dashboard-content> </dashboard-content>
        </div>
    </div>
    </v-app>
</template>

<script>
import SideBar from './SideBar.vue';
import TopNavbar from './TopNavBar.vue';
import DashboardContent from './DashboardContent.vue';
export default {
    components: { 
        SideBar,
        TopNavbar,
        DashboardContent
    },
}
</script>