
import Tween from "@/common/tween";

/**
 * target: 需要shake的dom标签
 * @param {*} param0 
 */
export default function shake({ target }) {
    let begin = 0
    let change = -65
    let duration = 30
    let tweenFn = Tween.Sine.easeIn;
    doShake({
        begin, change, duration, target, tweenFn,
        onFinish() {
            begin = begin + change
            change = 0 - begin;
            duration = 80
            tweenFn = Tween.Elastic.easeOut;
            doShake({ begin, change, duration, target,tweenFn })
        }
    })
}

function doShake({ begin, change, duration, target, tweenFn, onShaking, onFinish }) {
    animation(
        0,
        duration,
        (offset) => {
            let shakeVal = tweenFn(offset, begin, change, duration);
            target.style.transform = `rotate(${shakeVal}deg)`;
            if (offset == duration) {
                console.log(offset, shakeVal)
            }
            if (onShaking)
                onShaking(shakeVal)
        },
        () => {
            if (onFinish) onFinish();
        }
    );


    // animation(
    //     0,
    //     duration,
    //     offset => {
    //         let shakeVal =Tween.Elastic.easeOut(offset, beginDeg, changeDeg, duration);
    //         target.style.transform = `rotate(${shakeVal}deg)`;
    //         onShaking(shakeVal)
    //     },
    //     () => {
    //         if (onFinish) onFinish();
    //     }
    // );
}


/**
 * @offset 当前帧
 * @beginDeg 开始值
 * @changeDeg 变化量
 * @duration 持续帧数
 * @fn 动画函数
 */


/**
 * 
 * @param {*} offset 当前帧
 * @param {*} duration 总帧数
 * @param {*} doRender 渲染方法,每当要刷新帧时的回调
 * @param {*} onFinish 结束回调
 */
function animation(offset, duration, doRender, onFinish) {
    window.requestAnimationFrame(() => {
        if (offset > duration) {
            if (onFinish) onFinish();
            return;
        }
        doRender(offset)
        // let r = computeShakeFn(offset,duration, onShaking, onFinish);
        // thisRef.rotateDeg = parseInt(r); //更新当前度数
        // avatar.style.transform = `rotate(${thisRef.rotateDeg}deg)`; //旋转
        animation(++offset, duration, doRender, onFinish);
    });
}