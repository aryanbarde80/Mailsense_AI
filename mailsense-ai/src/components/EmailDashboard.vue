<!-- src/components/EmailDashboard.vue -->
<template>
    <div class="email-dashboard">
        <div class="header">
            <h1>Mailsense AI</h1>
            <button @click="fetchEmails" :disabled="loading">
                {{ loading ? 'Fetching...' : 'Fetch Emails' }}
            </button>
        </div>

        <div class="email-list">
            <div v-for="email in emails" :key="email.id" class="email-item">
                <div class="email-header">
                    <h3>{{ email.subject }}</h3>
                    <span class="sender">{{ email.from }}</span>
                </div>
                <div class="email-preview">{{ email.body.substring(0, 200) }}...</div>
                <div class="email-analysis" v-if="email.analysis">
                    <div class="analysis-tags">
                        <span :class="`tag ${email.analysis.sentiment}`">
                            {{ email.analysis.sentiment }}
                        </span>
                        <span :class="`tag ${email.analysis.urgency}`">
                            {{ email.analysis.urgency }}
                        </span>
                        <span class="tag intent">{{ email.analysis.intent }}</span>
                    </div>
                    <p class="summary">{{ email.analysis.summary }}</p>
                </div>
                <button @click="processEmail(email)" :disabled="email.processing">
                    {{ email.processing ? 'Processing...' : 'Analyze' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { EmailProcessor } from '@/services/emailProcessor';

export default {
    name: 'EmailDashboard',
    data() {
        return {
            emails: [],
            loading: false
        };
    },
    methods: {
        async fetchEmails() {
            this.loading = true;
            try {
                // Implement email fetching logic
                // This could be from your email server or directly from email providers
                this.emails = await this.getEmailsFromServer();
            } catch (error) {
                console.error('Error fetching emails:', error);
            } finally {
                this.loading = false;
            }
        },

        async processEmail(email) {
            email.processing = true;
            try {
                const analysis = await EmailProcessor.processIncomingEmail(email);
                email.analysis = analysis;
                this.$forceUpdate();
            } catch (error) {
                console.error('Error processing email:', error);
            } finally {
                email.processing = false;
            }
        },

        async getEmailsFromServer() {
            // Implement based on your email source
            // This could be an API call to your backend
            return []; // Sample emails
        }
    }
};
</script>

<style scoped>
.email-dashboard {
    padding: 20px;
}

.email-item {
    border: 1px solid #ddd;
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px;
}

.analysis-tags {
    margin: 10px 0;
}

.tag {
    padding: 3px 8px;
    border-radius: 3px;
    margin-right: 5px;
    font-size: 12px;
}

.tag.positive { background: #d4edda; }
.tag.negative { background: #f8d7da; }
.tag.neutral { background: #e2e3e5; }
.tag.high { background: #f8d7da; }
.tag.medium { background: #fff3cd; }
.tag.low { background: #d1ecf1; }
</style>