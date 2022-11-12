<!-- Show Group Owner Information -->

<template>
    <section>
        <button @click="displayInformation = true">Owner Information <i
                class="fa fa-solid fa-square-arrow-up-right"></i></button>
        <section v-if="displayInformation" class="moderator-modal">
            <button class="close" @click="displayInformation = false"><i class="fa fa-solid fa-x fa-lg"></i></button>
            <section class="info">
                <p>
                    Group owners are able to:
                <ul>
                    <li>Perform all moderator actions, as they are also moderators.</li>
                    <li>Add/remove users from the moderator position.</li>
                    <li>Transfer group ownership to another group member.</li>
                </ul>
                Note that owners cannot leave a group themselves unless they transfer ownership to another user in the
                group.
                </p>
            </section>

        </section>
    </section>
</template>

<script>
export default {
    name: 'ModeratorInformation',
    data() {
        return {
            displayInformation: false
        }

    }
}
</script>
<style scoped>
.moderator-modal {
    z-index: 99;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    background-color: #F2E7DC;
    border: 1px solid #0D0D0D;
    border-radius: 5px;
}

.info {
    padding: 2em;
}
.close {
    border: none;
    position: relative;
    float: right;
    padding: 1em;
    color:#0D0D0D;
    background-color:transparent;
}

.close:hover {
    color: #027373;
    background-color:none;
    -webkit-transition: all ease 1s;
    -moz-transition: all ease 1s;
    transition: all ease 1s;
}
</style>
