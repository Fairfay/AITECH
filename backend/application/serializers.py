from rest_framework import serializers

from application.models import Lead


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = [
            'id', 'name',
            'services', 'contact_method',
            'phone', 'project_description',
            'privacy_policy_agreed', 'created_at',
            'sent_to_amocrm', 'sent_to_telegram',
            'amocrm_response', 'telegram_response'
        ]
        read_only_fields = [
            'id', 'created_at',
            'amocrm_response', 'telegram_response'
        ]
