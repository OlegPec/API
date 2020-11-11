<template>
    <div class="scanner-container">
        <div v-show="!isLoading">
            <video poster="data:image/gif,AAAA" ref="scanner"></video>
            <div class="scanner-instructions">
                <p class="instructions__title">Какая-то инструкция</p>
            </div>
<!--            <div class="overlay-element"></div>-->
<!--            <div class="laser"></div>-->
        </div>
        <div v-show="isLoading" class="NoActiveCamera">
            <p class="instructions__title">Для сканирования активируйте камеру в настройках</p>
        </div>
    </div>
</template>

<script>
    import { BrowserMultiFormatReader, Exception } from "@zxing/library";
    export default {
        name: "stream-barcode-reader",
        data() {
            return {
                isLoading: true,
                codeReader: new BrowserMultiFormatReader(),
                isMediaStreamAPISupported:
                    navigator &&
                    navigator.mediaDevices &&
                    "enumerateDevices" in navigator.mediaDevices

            };
        },
        mounted() {
            if (!this.isMediaStreamAPISupported) {
                throw new Exception("Media Stream API is not supported");
                return;
            }
            this.start();
            this.$refs.scanner.oncanplay = event => {
                this.isLoading = false;
                this.$emit("loaded");
            };
        },
        beforeDestroy() {
            this.codeReader.reset();
        },
        methods: {
            start() {
                this.codeReader.decodeFromVideoDevice(
                    undefined,
                    this.$refs.scanner,
                    (result, err) => {
                        if (result) {
                            this.$emit("decode", result.text);
                        }
                    }
                );
            }
        }
    };
</script>

<style scoped>
    video {
        max-width: 100%;
        width: 100%;
        /*max-height: 100%;*/
        /*height: 100%;*/
        position: absolute;
        transform: translateY(-20%);
        z-index: -1;
        background: black;
    }
    .scanner-container {
        position: relative;
        /*height: 100vh;*/
    }
    .scanner-instructions {
        background: black;
        width: 100%;
        height: 40vh;
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
    }
    .instructions__title {
        color: white;
        text-align: center;
    }
    .NoActiveCamera {
        height: 100vh;
        background: black;
    }
    .overlay-element {
        position: absolute;
        top: 0;
        width: 100%;
        height: 99%;
        /*background: rgba(30, 30, 30, 0.5);*/
        /*-webkit-clip-path: polygon(*/
        /*    0% 0%, 0% 100%, 10% 100%, 10% 40%, 90% 40%, 90% 60%, 10% 60%, 10% 100%, 100% 100%, 100% 0%*/
        /*);*/
        /*clip-path: polygon(*/
        /*    0% 0%,*/
        /*    0% 100%,*/
        /*    10% 100%,*/
        /*    10% 40%,*/
        /*    90% 40%,*/
        /*    90% 60%,*/
        /*    10% 90%,*/
        /*    10% 100%,*/
        /*    100% 100%,*/
        /*    100% 0%*/
        /*);*/
        /*clip-path: polygon(*/
        /*    0% 0%, 0% 100%, 10% 100%, 10% 40%, 90% 40%, 90% 60%, 10% 60%, 10% 100%, 100% 100%, 100% 0%*/
        /*);*/
    }
    /*.laser {*/
    /*    width: 60%;*/
    /*    margin-left: 20%;*/
    /*    background-color: tomato;*/
    /*    height: 1px;*/
    /*    position: absolute;*/
    /*    top: 40%;*/
    /*    z-index: 2;*/
    /*    box-shadow: 0 0 4px red;*/
    /*    -webkit-animation: scanning 2s infinite;*/
    /*    animation: scanning 2s infinite;*/
    /*}*/
    @-webkit-keyframes scanning {
        50% {
            -webkit-transform: translateY(100px);
            transform: translateY(100px);
        }
    }
    @keyframes scanning {
        50% {
            -webkit-transform: translateY(100px);
            transform: translateY(100px);
        }
    }
</style>
