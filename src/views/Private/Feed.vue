<template >
    <div>
        <NavBar/>
        <div class="mt-5">
            <PoemCard/>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import PoemCard from '@/components/PoemCard.vue';


export default {
    components: {NavBar, PoemCard}
}
</script>