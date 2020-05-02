<template>
	<view class="content">
		<view class="circleprogress">
			<view class="wrapper left">
				<view class="leftprogress" :style="{ transform: leftprogress}"></view>
			</view>
			<view class="wrapper right">
				<view class="rightprogress" :style="{ transform: rightprogress}"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
      return {
        leftprogress: 'rotate(-45deg)',
        rightprogress: 'rotate(45deg)',
        progresstext: '0'
      }
    },
		methods: {
			sliderchange:function(val){
				// var val = event.detail.value;
				this.progresstext = val;
				var deg = val/100*360;
				if(deg<=180)
				{
					this.rightprogress = 'rotate('+(45+deg)+'deg)'
					this.leftprogress = 'rotate('+(-45)+'deg)'
				}else
				{
					this.rightprogress = 'rotate('+(45+180)+'deg)'
					this.leftprogress = 'rotate('+(-45+(deg-180))+'deg)'
				}
				// {
				// 	this.rightprogress = 'rotate('+eval(45+deg)+'deg)'
				// 	this.leftprogress = 'rotate('+eval(-45)+'deg)'
				// }else
				// {
				// 	this.rightprogress = 'rotate('+eval(45+180)+'deg)'
				// 	this.leftprogress = 'rotate('+eval(-45+(deg-180))+'deg)'
				// }
			}
		},
    props:['progress'],
    watch: {
		  progress(handler){
        this.sliderchange(parseInt(handler*100))
      }
    }
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		flex-flow: wrap;
		align-items: center;
		border-radius: 50%;
		text-align: center;
		/*padding-top: 50px;*/
	}
	.circleprogress{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;

	}
	.wrapper{
		width: 50%;
		height: 100%;
		overflow: hidden;
	}
	.leftprogress,.rightprogress{
		width: 200%;
		height: 100%;
		border:20rpx solid rgb(226,226,266);
		border-bottom:20rpx solid green;
		border-radius: 50%;
    box-sizing: border-box;
	}
	.leftprogress{
		border-right:20rpx solid green;
	}
	.rightprogress{
		border-left:20rpx solid green;
		margin-left: -101%;
	}
</style>
