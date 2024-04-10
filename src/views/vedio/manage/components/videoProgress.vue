<template>
    <div
        ref="progressWrapper"
        class="video-progress"
        @click="onTrackClick"
        @mousemove="mouseMove">
        <div class="video-progress-track" :style="{ 'width': progress + '%'}"></div>
        <div class="video-progress-point" ref="slider" :style="{ 'left': progress + '%'}" @mousedown="mouseDown"></div>
    </div>
</template>
<script>
export default {
    props: {
        progress: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            isDrag: false,
            distanceX: 0,
            videoProgress: 0
        }
    },
    watch: {
        isDrag(val) {
            this.$emit('getDragStatus', val)
        },
        progress(val) {
            if (this.$refs.progressWrapper) {
                this.videoProgress = (this.progress * (this.$refs.progressWrapper.offsetWidth * this.zoom)) / 100
            }
        }
    },
    methods: {
        onTrackClick(event) {
            this.isDrag = false
            const sliderElement = this.$refs.slider
            if (event.target === sliderElement) return
            this.calculateDiatance(event.offsetX)
        },
        mouseDown(event) {
            if (this.progress === 100) return
            this.isDrag = true
            this.distanceX = event.pageX - this.videoProgress
            document.addEventListener('mouseup', () => {
                this.isDrag = false
            })
        },
        mouseMove(event) {
            if (this.isDrag) {
                const offsetX = event.pageX - this.distanceX
                this.calculateDiatance(offsetX)
            }
        },
        calculateDiatance(pageX) {
            const parentWidth = this.$refs.progressWrapper.offsetWidth
            const sliderWidth = this.$refs.slider.offsetWidth
            if (pageX > parentWidth - sliderWidth) {
                this.videoProgress = parentWidth - sliderWidth
            } else if (pageX < sliderWidth) {
                this.videoProgress = 0
            } else {
                this.videoProgress = pageX
            }
            this.$emit('updateVideo', (this.videoProgress / (parentWidth * this.zoom))  * 100)
        }
    }
}
</script>
<style lang="scss">
.video-progress {
    position: absolute;
    bottom: 65px;
    left: 440px;
    width: 1060px;
    height: 6px;
    z-index: 1000;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    background-color: #cbb8f7;
    border: 2px solid #8364d1;
    border-radius: 5px;
    cursor: pointer;
    .video-progress-track {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: left center;
        background-color: #51319e;
        pointer-events: none;
        width: 100%;
        height: 100%;
        position: relative;
        border-radius: 5px;
        overflow: hidden;
        // transition: width 0.3s linear;
    }
    .video-progress-point {
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        // pointer-events: none;
        width: 24px;
        height: 24px;
        background-color: #51319e;
        border: 2px solid #8a6bda;
        border-radius: 50%;
        position: absolute;
        margin-left: -14px;
        margin-top: -18px;
        left: 0;
        // transition: left 0.3s linear;
    }
}
</style>

