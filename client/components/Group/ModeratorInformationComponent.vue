<!-- Show Group Moderator Information -->

<template>
    <section>
        <button @click="displayInformation = true">Moderator Information <i
                class="fa fa-solid fa-square-arrow-up-right"></i></button>
        <section v-if="displayInformation" class="moderator-modal">
            <button class="close" @click="displayInformation = false"><i class="fa fa-solid fa-x fa-lg"></i></button>
            <section class="info">
                <p>
                    Moderators are able to:
                <ul>
                    <li>Remove any freet from the group by clicking the Remove Freet From Group button next to any
                        freet.
                        Note that this does not delete the freet itself but just remove its association with the group.
                    </li>
                    <li>Remove any users who are not moderators in the group by clicking the Remove User button under
                        each
                        user.</li>
                </ul>
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
