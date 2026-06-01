import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../services/order';
import { ParticipantService } from '../../services/participant';
import { OrderItemService } from '../../services/order-item';
import { GroupOrder } from '../../../../shared/models/model';
import { Participant } from '../../../../shared/models/participant.model';
import { OrderItem } from '../../../../shared/models/order-item.model';

@Component({
  selector: 'app-order-details-page',
  imports: [RouterLink],
  templateUrl: './order-details-page.html',
  styleUrl: './order-details-page.css',
})
export class OrderDetailsPage implements OnInit {
  order: GroupOrder | null = null;
  participants: Participant[] = [];
  items: OrderItem[] = [];
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private participantService: ParticipantService,
    private orderItemService: OrderItemService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'некорректный id заказа';
      this.loading = false;
      this.cdr.markForCheck();
      return;
    }

    this.orderService.getById(Number(id)).subscribe({
      next: (order) => {
        this.order = order;
        this.loadParticipants(id);
        this.loadItems(id);
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'не удалось загрузить заказ';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  private loadParticipants(orderId: string): void {
    this.participantService.getByOrderId(orderId).subscribe({
      next: (participants) => {
        this.participants = participants;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'не удалось загрузить участников';
        this.cdr.markForCheck();
      },
    });
  }

  private loadItems(orderId: string): void {
    this.orderItemService.getByOrderId(orderId).subscribe({
      next: (items) => {
        this.items = items;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'не удалось загрузить позиции заказа';
        this.cdr.markForCheck();
      },
    });
  }

  getParticipantName(participantId: string): string {
    const participant = this.participants.find((p) => p.id === participantId);
    return participant ? participant.name : 'неизвестный участник';
  }

  getItemTotal(item: OrderItem): number {
    return item.price * item.quantity;
  }

  getParticipantTotal(participantId: string): number {
    return this.items
      .filter((item) => item.participantId === participantId)
      .reduce((sum, item) => sum + this.getItemTotal(item), 0);
  }

  getPaidTotal(): number {
    return this.participants
      .filter((participant) => participant.paid)
      .reduce((sum, participant) => {
        return sum + this.getParticipantTotal(participant.id);
      }, 0);
  }

  getUnpaidTotal(): number {
    return this.participants
      .filter((participant) => !participant.paid)
      .reduce((sum, participant) => {
        return sum + this.getParticipantTotal(participant.id);
      }, 0);
  }

  increaseRating(participant: Participant): void {
    const newRating = participant.rating + 1;

    this.participantService.updateRating(participant, newRating).subscribe({
      next: (updatedParticipant) => {
        participant.rating = updatedParticipant.rating;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'не удалось повысить рейтинг';
        this.cdr.markForCheck();
      },
    });
  }

  decreaseRating(participant: Participant): void {
    if (participant.rating <= 0) {
      return;
    }

    const newRating = participant.rating - 1;

    this.participantService.updateRating(participant, newRating).subscribe({
      next: (updatedParticipant) => {
        participant.rating = updatedParticipant.rating;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'не удалось понизить рейтинг';
        this.cdr.markForCheck();
      },
    });
  }

  togglePaymentStatus(participant: Participant): void {
    const newPaidStatus = !participant.paid;

    this.participantService
      .updatePaymentStatus(participant, newPaidStatus)
      .subscribe({
        next: (updatedParticipant) => {
          participant.paid = updatedParticipant.paid;
          this.cdr.markForCheck();
        },
        error: () => {
          this.error = 'не удалось изменить статус оплаты';
          this.cdr.markForCheck();
        },
      });
  }

  exportReport(): void {
    if (!this.order) {
      return;
    }

    let report = `Отчёт по заказу: ${this.order.title}\n`;
    report += `Описание: ${this.order.description}\n`;
    report += `Статус: ${this.order.status}\n`;
    report += `Общая сумма: ${this.order.totalPrice} ₽\n`;
    report += `Дата создания: ${this.order.createdAt}\n\n`;

    report += `Участники:\n`;

    for (const participant of this.participants) {
      report += `- ${participant.name}, рейтинг: ${participant.rating}, `;
      report += participant.paid ? `оплачено\n` : `не оплачено\n`;
    }
    report += `\nПозиции заказа:\n`;
    for (const item of this.items) {
      report += `- ${item.title}: ${item.price} ₽ × ${item.quantity}`;
      report += ` = ${this.getItemTotal(item)} ₽`;
      report += `, участник: ${this.getParticipantName(item.participantId)}\n`;
    }
    report += `\nРасчёт расходов:\n`;
    for (const participant of this.participants) {
      report += `- ${participant.name}: ${this.getParticipantTotal(participant.id)} ₽\n`;
    }
    report += `\nИтоги:\n`;
    report += `Оплачено: ${this.getPaidTotal()} ₽\n`;
    report += `Не оплачено: ${this.getUnpaidTotal()} ₽\n`;
    const blob = new Blob([report], {
      type: 'text/plain;charset=utf-8',
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `order-${this.order.id}-report.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
