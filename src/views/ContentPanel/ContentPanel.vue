<template>
    <div class="content-panel">
        <el-row v-for="item in $config.menu" :key="item.name" :id="item.name">
            <el-row class="name-row">
                <img class="img mr4" :src="'./img/menu/' + item.icon.replace('.png', '_B.png')" />
                <span>{{ item.name }}</span>
                <div class="line"></div>
            </el-row>
            <el-row>
                <el-col v-for="content in item.content" :key="content.name" :span="6">
                    <div class="item-panel" @click="goToApplication(item.path, content.name)">
                        <span class="t-hidden" :title="content.name">{{ content.name }}</span>
                        <img :src="'./img/thumbnail/' + content.thumbnail" alt="" />
                    </div>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        goToApplication(path, name) {
            let routeUrl = this.$router.resolve({
                path: path,
                query: {
                    name: name,
                },
            });
            window.open(routeUrl.href, '_blank');
        },
    },
};
</script>

<style lang="scss">
$img: 22px;
.content-panel {
    padding: 0 30px 20px 30px;
    .name-row {
        width: 100%;
        margin-top: 20px;
        font-size: 18px;
        font-weight: 400;
        text-align: left;
        color: #333333;
        line-height: 25px;
        .img {
            position: relative;
            top: 4px;
            left: 2px;
        }
        .line {
            margin: 10px 0;
            width: 100%;
            height: 1px;
            background-color: #d8d8d8;
        }
    }
    .item-panel {
        margin: 0 auto;
        background-color: #fff;
        height: auto;
        width: calc(100% - 20px);
        display: grid;
        grid-template-rows: 30px 1fr;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        .t-hidden {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #000;
        }
    }
}
</style>
