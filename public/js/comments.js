(function ($) {
    let commentFrom = $("#comment-form"),
        commentArea = $("#commentarea"),
        comments = $("#comments"),
        addButton = $("#add")


    addButton.click(function (event) {
        event.preventDefault();

        let newComment = commentArea.val();
        let cakeName = $(".cakename").html();
        // let userName = "admin";

        console.log(newComment);

        if (newComment) {
            let requestConfig = {
                method: "POST",
                url: "/comment",
                contentType: "application/json",
                data: JSON.stringify({
                    // username: userName,
                    cakename: cakeName,
                    newcomment: newComment
                })
            };

            $.ajax(requestConfig).then(function (responseMessage) {
                console.log(responseMessage);
                let newElement = $(responseMessage);
                comments.append(newElement);
                commentArea.val("");
            });
        }
    });
})(window.jQuery);