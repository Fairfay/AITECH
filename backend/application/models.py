from django.db import models


class Lead(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name='Ваше имя'
    )
    services = models.JSONField(
        default=list,
        verbose_name='Выбранные услуги'
    )
    contact_method = models.CharField(
        max_length=20,
        default='phone',
        verbose_name='Удобный способ связи'
    )
    phone = models.CharField(
        max_length=50,
        verbose_name='Номер телефона'
    )
    project_description = models.TextField(
        verbose_name='Описание проекта',
        null=True,
        blank=True,
    )
    privacy_policy_agreed = models.BooleanField(
        default=False,
        verbose_name='Согласие с политикой конфиденциальности'
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    sent_to_amocrm = models.BooleanField(
        default=False,
        verbose_name='Отправлено в amoCRM'
    )
    sent_to_telegram = models.BooleanField(
        default=False,
        verbose_name='Отправлено в Telegram'
    )
    amocrm_response = models.TextField(
        null=True,
        blank=True,
        verbose_name='Ответ amoCRM'
    )
    telegram_response = models.TextField(
        null=True,
        blank=True,
        verbose_name='Ответ Telegram'
    )
    class Meta:
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'
        indexes = [
            models.Index(fields=['created_at']),
            models.Index(fields=['sent_to_amocrm']),
            models.Index(fields=['sent_to_telegram']),
        ]

    def __str__(self):
        return f"{self.name} - {self.contact_method} - {self.created_at}"
