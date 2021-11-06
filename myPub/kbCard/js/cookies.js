/**  
	setCookie(cname, cvalue, exdays)  : 쿠키이름 , 쿠키값 , 안보일날짜수 
**/
function setCookie(cname, cvalue, exdays) {
    var d = new Date(); //현재 시간을 구합니다.
    d.setTime(d.getTime() + (exdays*24*60*60*1000)); // 시간, 분, 초
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
/**  getCookie(cname) **/
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}