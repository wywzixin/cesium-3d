<template>
    <div class="layout">
        <content-panel></content-panel>
    </div>
</template>

<script>
import ContentPanel from '../ContentPanel/ContentPanel';
export default {
    name: 'Home',
    components: {
        ContentPanel,
    },
    data() {
        return {};
    },
    methods: {},
};
</script>
<style lang="scss">
.layout {
    width: 100%;
    height: 100%;
}
</style>
