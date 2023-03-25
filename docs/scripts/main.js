// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed
$(document).ready(function () {
    $("#map-image").on("click")
    {

    }

    $('#go-to-top').click(function () {
        $('html,body').animate({scrollTop: 0}, 400);
        return false;
    });

    setCoupleAccounts()
})



function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function setCoupleAccounts() {
    addGroomAccounts(couple.groom.accounts)
    addBrideAccounts(couple.bride.accounts)
}

function addGroomAccounts(accounts) {
    accounts.forEach(function(account) {
        $("#groom-accounts").append(createAccountItemElement(account));
    })
}

function addBrideAccounts(accounts) {
    accounts.forEach(function(account) {
        $("#bride-accounts").append(createAccountItemElement(account));
    })
}

function createAccountItemElement(accountInfo) {
    var plainText = {
        bankName: accountInfo["bank_name"],
        bankAccountNumber: accountInfo["bank_account_number"],
        holderName: accountInfo["holder_name"],
        qrLink: accountInfo["qr_link"]
    }

    if (plainText.qrLink)
        return `<div class="dropdown-content-container">
                   <div class="bank-account-item" onclick="copyToClipboard(this)">
                   ${plainText.holderName} <span class="clipboard-target">${plainText.bankName} ${plainText.bankAccountNumber}</span> &nbsp;&nbsp;<i class="fa fa-files-o" aria-hidden="true"></i>
                       <br>
                   </div>
                   <div class="quick-link-item">
                       <a href="${plainText.qrLink}" target="_blank"><img class="map-icon" src="images/icon/pay-logo.png" style="width: 30px"/></a>
                   </div>
               </div>`
    else
        return `<div class="dropdown-content-container">
                    <div class="bank-account-item" onclick="copyToClipboard(this)">
                    ${plainText.holderName} <span class="clipboard-target">${plainText.bankName} ${plainText.bankAccountNumber}</span> &nbsp;&nbsp;<i class="fa fa-files-o" aria-hidden="true"></i>
                        <br>
                   </div>
               </div>`
}

function getContact(coupleType, prefix) {
    console.log(prefix + ":" + decodeAES256(couple[coupleType]["phone_number"]))
    document.location.href = prefix + ":" + decodeAES256(couple[coupleType]["phone_number"])
}

// 레거시 브라우저 문제로 아래 방법으로 바꿈
function copyToClipboard(e) {
    var element = document.createElement("textarea");
    element.value = $(e).children('.clipboard-target').text();
    document.body.appendChild(element)
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
    alert('클립보드에 복사하였습니다.')
}



// Smooth scroll for links with hashes
$("a.smooth-scroll").click(function (event) {
    // On-page links
    if (
        location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
    ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $("html, body").animate(
                {
                    scrollTop: target.offset().top
                },
                1000,
                function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    }
                }
            );
        }
    }
});
